import { type FC } from 'react'
import BundleCard from '../../components/BundleCard'
import { useLoaderData } from 'react-router-dom'

const BundlePage: FC = () => {
    // get loader 
    const bundle = useLoaderData();

    return (
        <div className='w-full py-12 flex flex-col justify-start items-center gap-12'>
            {/* big title */}
            <div className='w-full flex flex-col justify-start items-center gap-4 pt-14'>
                <h1 className='text-white text-4xl font-extrabold capitalize'>
                    Best Pricing For Everyone
                </h1>
                <h1 className='text-white text-4xl font-extrabold capitalize'>
                    Who Wants to Grow Business
                </h1>
                <p className='text-md text-white'>
                    We delivery robust features to anyone unconditionally.
                </p>
            </div>

            {/* bundle */}
            <div className='w-full flex flex-row justify-center items-start gap-12'>
                {/* card bundle 1 */}
                <BundleCard bundle={bundle[0]} />
                {/* card bundle  */}
                <BundleCard bundle={bundle[1]} />
            </div>
        </div>
    )
}

export default BundlePage
