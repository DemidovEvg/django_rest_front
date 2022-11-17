import axios, { AxiosError } from "axios";
import { IUserHandler } from "./tokenHook";

interface props {
  url: URL,
  UserHandler: IUserHandler
}

let timer = 0;

export async function fetchData<Type>({ url, UserHandler }: props): Promise<Type[]> {
  let page = 1;
  let items: Type[] = []

  if (!UserHandler.refresh) {
    return items
  }

  interface IResponse {
    count: number
    next?: string
    previous?: string
    results: Type[]
  }

  const headers = UserHandler.getHeaders()
  // console.log(headers)


  while (true) {
    try {
      url.searchParams.set('page', `${page}`)
      const response = await axios.get<IResponse>(url.href, { headers })
      const data = response.data

      if (data.results) {
        items = [...items, ...data.results]
      }
      if (!data.next) {
        break
      }
      page += 1
    } catch (exc: unknown) {
      const error = exc as AxiosError
      console.log(error)
      if (error?.response?.status === 401 && UserHandler) {
        // Необходимо попробовать обновить токен
        if (timer) {
          console.log('Чистим таймер')
          clearTimeout(timer)
        }
        timer = +setTimeout(() => {
          UserHandler.refreshAccessToken()
        }, 0)
      }
      break
    }
  }
  return items

}