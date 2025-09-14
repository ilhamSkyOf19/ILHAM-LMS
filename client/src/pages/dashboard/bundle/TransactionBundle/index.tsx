import { type FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import type { ResponseData } from '../../../../types/types'
import type { BundleResponse } from '../../../../models/bundle-model'
import BundleCard from '../../../../components/BundleCard'
import { useMutation } from '@tanstack/react-query'
import { TransactionService } from '../../../../services/transaction.service'

const TransactionBundle: FC = () => {

    // bundle
    const bundle = useLoaderData() as ResponseData<BundleResponse[]>


    // mutate 
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: { id_item: string }) => {
            return TransactionService.pay(data)
        },
        onError: (error) => console.log(error),
    })

    // handle submit
    const handleSubmit = async (item: { id_item: string }) => {
        try {
            if (!item) return

            // response 
            const response = await mutateAsync(item);

            // cek 
            if (!response.success) return


            // redirect
            window.location.replace(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='w-full min-h-[100vh] py-12 flex flex-col justify-start items-center gap-12'>
            {/* title */}
            <h1 className='text-black text-4xl font-extrabold'>
                Please choose your bundle
            </h1>
            <div className='w-full flex flex-row justify-center items-center gap-12'>
                {
                    bundle.success && (
                        <>
                            {/* card bundle 1 */}
                            <BundleCard type='buy' bundle={bundle.data[0]} handleBuy={handleSubmit} disabled={isPending} />
                            {/* card bundle  */}
                            <BundleCard type='buy' bundle={bundle.data[1]} handleBuy={handleSubmit} disabled={isPending} />

                        </>
                    )
                }
            </div>
        </div>
    )
}

export default TransactionBundle
