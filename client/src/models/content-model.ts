export type CreateContentModel = {
    title: string
    type: 'video' | 'text',
    videoId?: string
    text?: string
}


// update 
export type UpdateContentModel = Partial<CreateContentModel>


// response 
export type ContentResponse = CreateContentModel & { _id: string }


