import { toJS } from 'mobx'
import React from 'react'
import styled, { css } from 'styled-components'

import { Box, Link, Text } from '../../../../components'
import { cssFactory } from '../../../../components/utils/styled-components'
import { prettyNumber } from '../../../../lib/currency'
import { Budget } from '../../../../types/budget'

interface Props {
    id?: string
    name: string
    budget?: Budget
    budgeted: number | undefined
    spent: number | undefined
}

export default class TableRow extends React.Component<Props> {
    public render() {
        const { id, name, budget, budgeted, spent } = this.props
        const progress = Math.round(
            ((spent as number) / (budgeted as number)) * 100,
        )
        const remaining = (budgeted as number) - (spent as number)
        return (
            <StyledTableRow>
                <StyledTableData>
                    {id ? (
                        <Link
                            color={Link.Color.Blue2}
                            to={{
                                pathname: `/budgets/${id}`,
                                state: { budget: toJS(budget) },
                            }}
                            weight={Link.Weight.Medium}
                        >
                            {name}
                        </Link>
                    ) : (
                        <Text
                            color={Link.Color.Gray1}
                            weight={Link.Weight.Medium}
                        >
                            {name}
                        </Text>
                    )}
                </StyledTableData>

                <StyledTableData>
                    <Box
                        alignItems={Box.AlignItems.Center}
                        display={Box.Display.Flex}
                    >
                        <Box
                            backgroundColor={Box.BackgroundColor.Gray9}
                            cornerRadius={Box.CornerRadius.Round}
                            css={genProgressOuterCSS()}
                            display={Box.Display.Flex}
                            mr={1}
                        >
                            <Box
                                backgroundColor={
                                    progress > 75
                                        ? Box.BackgroundColor.Red3
                                        : Box.BackgroundColor.Green3
                                }
                                cornerRadius={Box.CornerRadius.Round}
                                css={genProgressInnerCSS(progress)}
                            />
                        </Box>
                        <Text>{progress}%</Text>
                    </Box>
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right}>
                        {prettyNumber(budgeted as number)}
                    </Text>
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right}>
                        {prettyNumber(spent as number)}
                    </Text>
                </StyledTableData>

                <StyledTableData>
                    <Text align={Text.Align.Right} color={Text.Color.Gray1}>
                        {prettyNumber(remaining)}
                    </Text>
                </StyledTableData>
            </StyledTableRow>
        )
    }
}

const genProgressOuterCSS = () =>
    cssFactory(css)`
    height: 0.6rem;
    max-width: 4.5rem;
    min-width: 4.5rem;
    width: 100%;
`

const genProgressInnerCSS = (amount: number) =>
    cssFactory(css)`
    height: 100%;
    min-width: ${amount > 0 ? '0.75rem' : 0};
    width: ${amount}%;
`

const StyledTableRow = styled.tr`
    td {
        border-bottom: 1px solid ${props => props.theme.colors.gray9};
        padding-bottom: 1rem;
        padding-top: 1rem;
        &:first-child {
            border-right: 1px solid ${props => props.theme.colors.gray9};
        }
    }
`

const StyledTableData = styled.td`
    padding-left: 1rem;
    padding-right: 1rem;
`
