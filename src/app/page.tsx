import cloudinary from "cloudinary"
import { CloudinaryImage } from './gallery/CloudinaryImage'

interface searchResults {
  public_id: string
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const results = await cloudinary.v2.search
  .expression('resource_type:image AND folder:Album1')
  .sort_by("display_name", "desc")
  .max_results(15)
  .execute() as {resources: searchResults[]}

    console.log(results)

    return(
      <div className='flex flex-row gap-6 flex-wrap'>
        {results.resources.map(result =>(
          <CloudinaryImage
            width={500}
            height={500}
            key={result.public_id}
            src={result.public_id}
            alt="smth"
          />
        ))}
      </div>
    )

}
