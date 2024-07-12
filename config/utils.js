import { getItem } from "./storage"

export const getUser = async () => {
  return await getItem('user')
}