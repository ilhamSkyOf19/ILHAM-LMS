import type { FC, ReactNode } from 'react'


type Props = {
    title: string;
    desc?: string;
    children: ReactNode;
}

const TitleContentDashboard: FC<Props> = ({ title, desc, children }) => {
    return (
        <div className="w-full flex flex-row justify-between items-center gap-3">
            {/* title */}
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <h1 className="text-black text-3xl font-extrabold capitalize">
                    {title}
                </h1>
                {/* desc */}
                <p className="text-slate-500">
                    {desc}
                </p>
            </div>

            {children}

        </div>
    )
}

export default TitleContentDashboard
