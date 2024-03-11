'use client'
import * as SeparatorRadix from '@radix-ui/react-separator';

const Separator = () => {
    return (
        <SeparatorRadix.Root className='bg-neutral-300A dark:bg-darkNeutral-300A data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full' />
    )
}

export { Separator }