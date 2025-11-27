import { createClient, MicroCMSQueries } from "microcms-js-sdk";
import type { Game } from "./type";

if (!process.env.MICRO_CMS_SERVICE_DOMAIN) {
    throw new Error("MICRO_CMS_SERVICE_DOMAIN is not defined");
}

if (!process.env.MICRO_CMS_API_KEY) {
    throw new Error("MICRO_CMS_API_KEY is not defined");
}

const client = createClient({
    serviceDomain: process.env.MICRO_CMS_SERVICE_DOMAIN,
    apiKey: process.env.MICRO_CMS_API_KEY,
});





export async function getGameList(queries?: MicroCMSQueries) {
    const result = await client.getList<Game>(
        {
            endpoint: "game",
            queries: queries,
        }
    )

    return result.contents;
}



export async function getGameDetail(id: string) {
    const result = await client.getListDetail<Game>({
        endpoint: "game",
        contentId: id,
    });
    
    return result;
}