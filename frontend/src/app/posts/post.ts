export interface Post {
    title: string,
    postDescription: string,
    author: string,
    postBody: string,
    timestamp: Date,
    topic: [string],
    likes: Number,
    shares: Number,
    comments: [string],
    bannerImageName: string
}