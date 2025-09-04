import { type FC, type ReactNode } from 'react'
import { motion } from 'framer-motion'


type Props = {
    children: ReactNode
}

const MotionToRight: FC<Props> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    )
}

export default MotionToRight
