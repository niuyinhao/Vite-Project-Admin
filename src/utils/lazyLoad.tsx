import { Spin } from 'antd'
import React, { Suspense } from 'react'

function lazyLoad(Com: React.LazyExoticComponent<any>): React.ReactNode {
    return (
        <Suspense
            fallback={
                <Spin
                    size='large'
                />
            }>
            <Com />
        </Suspense>
    )
}
export default lazyLoad
