import { type FC } from 'react'
import { formatCurrency } from '../../helpers/formatCurrency';




// icon
import noteFavoriteWhite from '../../assets/images/icons/note-favorite-white.svg'
import tickCircleWhite from '../../assets/images/icons/tick-circle-white.svg'
import ButtonBlueShadowPurple from '../ButtonBlueShadowPurple';
import ButtonBorderInset from '../ButtonBorderInset';



type Props = {
    bundle: any;
}

const BundleCard: FC<Props> = ({ bundle }) => {
    return (
        <div className='w-[23rem] py-6 px-6 flex flex-col justify-start items-start gap-8 border-border-color-primary bg-blue-secondary rounded-2xl'>
            {/* icon */}
            <img src={noteFavoriteWhite} className='w-14' alt="icon" loading='lazy' />

            {/* price & description */}
            <div className='flex flex-col justify-start items-start gap-2'>
                {/* price */}
                <h1 className='text-4xl font-extrabold text-white'>
                    {formatCurrency(bundle.price)}
                </h1>
                {/* description */}
                <p className='text-white-primary text-sm'>
                    {bundle.decription}
                </p>
            </div>

            {/* benefits */}
            <div className="w-full flex flex-col justify-start items-start gap-4 py-6 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[1.5px] before:bg-border-color-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-border-color-primary">
                {/* benefit */}
                {
                    bundle.benefits.map((benefit: any, i: number) => (
                        <div key={i} className='w-full flex flex-row justify-start items-center gap-2'>
                            {/* icon */}
                            <img src={tickCircleWhite} className='w-5' alt="icon" loading='lazy' />
                            <p className='text-sm text-white font-semibold'>
                                {benefit.name}
                            </p>
                        </div>
                    ))
                }
            </div>

            {/* button */}
            <div className='w-full flex flex-col justify-start items-start gap-4'>
                {/* button choose */}
                <ButtonBlueShadowPurple type='submit' label='choose this plan' />

                {/* button contact */}
                <ButtonBorderInset type='submit' label='contact our sales' />
            </div>
        </div >
    )
}

export default BundleCard
