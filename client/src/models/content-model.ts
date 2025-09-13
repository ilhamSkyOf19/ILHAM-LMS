export type CreateContentModel = {
    title: string
    type: 'video' | 'text',
    videoId?: string
    text?: string
}



// response 
export type ContentResponse = CreateContentModel & { id: string }