import { MicroCMSListContent } from "microcms-js-sdk"

export type Game = {
    "id": string
    "title": string
    "description": string
    
    "thumbnail": MicroCMSImage

    "platform": string
    "players": string

} & MicroCMSListContent