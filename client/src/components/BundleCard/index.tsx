import { type FC } from 'react'
import { formatCurrency } from '../../helpers/formatCurrency';




// icon
import noteFavoriteWhite from '../../assets/images/icons/note-favorite-white.svg'
import tickCircleWhite from '../../assets/images/icons/tick-circle-white.svg'
import ButtonBorderInset from '../ButtonBorderInset';
import type { BundleResponse } from '../../models/bundle-model';
import LinkButtonBlueShadowPurple from '../LinkButtonBlueShadowPurple';



type Props = {
    bundle: BundleResponse;
}

const BundleCard: FC<Props> = ({ bundle }) => {
    return (
        <div className='w-[23rem] py-6 px-6 flex flex-col justify-start items-start gap-8 border-border-color-primary bg-blue-secondary rounded-2xl'>
            {/* icon */}
            <div className='w-full flex flex-row justify-start items-center gap-4'>
                <img src={noteFavoriteWhite} className='w-14' alt="icon" loading='lazy' />
                {/* name bundle */}
                <h1 className='text-white text-2xl font-bold capitalize'>
                    Bundle <span className='text-blue-primary'>{bundle.name}</span>
                </h1>
            </div>

            {/* price & description */}
            <div className='flex flex-col justify-start items-start gap-2'>
                {/* price */}
                <h1 className='text-4xl font-extrabold text-white'>
                    {formatCurrency(bundle.price)}
                </h1>
                {/* description */}
                <p className='text-white-primary text-sm'>
                    A bundle is a set of products or services offering extra value and convenience.
                </p>
            </div>

            {/* benefits */}
            <div className="w-full flex flex-col justify-start items-start gap-4 py-6 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[1.5px] before:bg-border-color-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-border-color-primary">
                {/* benefit */}
                {
                    bundle.benefits.map((benefit: string, i: number) => (
                        <div key={i} className='w-full flex flex-row justify-start items-center gap-2'>
                            {/* icon */}
                            <img src={tickCircleWhite} className='w-5' alt="icon" loading='lazy' />
                            <p className='text-sm text-white font-semibold'>
                                {benefit}
                            </p>
                        </div>
                    ))
                }
            </div>

            {/* button */}
            <div className='w-full flex flex-col justify-start items-start gap-4'>
                {/* button choose */}
                <LinkButtonBlueShadowPurple link='/manager/sign-in' label='choose this plan' />

                {/* button contact */}
                <ButtonBorderInset type='submit' label='contact our sales' />
            </div>
        </div >
    )
}

export default BundleCard
