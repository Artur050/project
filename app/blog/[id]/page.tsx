import { Metadata } from "next";

async function getData(id: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        next: {
            revalidate: 60,
        }
    });
    return response.json();
}

type Props = {
    params: {
        id: string
    }
}

export async function generateMetadata({params: {id}}: Props): Promise<Metadata>{
    const post = await getData(id);

    return {
        title: post.title,
    }
}

export default async function Post({params: { id } }: Props) {
    const post = await getData(id);
    
    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <h1 className="text-2xl">{post.title}</h1>
            <h2>{post.body}</h2>
        </div>
    );
  }
  