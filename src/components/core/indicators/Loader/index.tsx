import * as React from 'react'
import styled, { css } from 'styled-components'

import { AnyColor as Color } from '../../../types/color'
import { style } from '../../../utils/css'
import { cssFactory } from '../../../utils/styled-components'
import { Box } from '../../layout/Box'

interface SharedProps {
    /**
     * Defaults to `Field.Color.Gold3`.
     */
    color: Color

    /**
     * Center loader in container.
     */
    center: boolean
}

/**
 * Use `<Loader>` while there is a large amount of content not ready for viewing.
 */
export class Loader extends React.Component<SharedProps> {
    public static Color = Color

    public static defaultProps = { color: Color.Gold3, center: true }

    public render() {
        const { color, center } = this.props

        return (
            <Box
                display={Box.Display.Flex}
                justifyContent={center ? Box.JustifyContent.Center : undefined}
            >
                {[0, 1, 2].map(v => (
                    <StyledLoader color={color} key={v} />
                ))}
            </Box>
        )
    }
}

interface LoaderProps {
    color: Color
}

const loaderStyles = cssFactory<LoaderProps>(css)`
    @keyframes loader {
        0%,
        80%,
        100% {
            opacity: 0;
        }
        30%,
        50% {
            opacity: 1;
        }
    }
    animation: loader .8s infinite linear;
    ${props => style('background', props.theme.colors[props.color])};
    border-radius: 50%;
    height: 9px;
    margin: 0 3px;
    width: 9px;
    &:nth-child(1) {
        animation-delay: -0.3s;
    }
    &:nth-child(2) {
        animation-delay: -0.15s;
    }
`

const StyledLoader = styled.div`
    ${loaderStyles}
`
