import React from 'react'
import styled from 'styled-components'

import { Box, Text } from '../../../../components'
import { Budget } from '../../../../types/budget'
import TableRow from '../TableRow'

interface Props {
    budgets: Budget[]
    total: { [name: string]: any }
}

export default class Table extends React.Component<Props> {
    public render() {
        const { budgets, total } = this.props

        if (!budgets.length) {
            return (
                <Box
                    b
                    borderColor={Box.BorderColor.Gray9}
                    cornerRadius={Box.CornerRadius.Small}
                    p={8}
                >
                    <Text align={Text.Align.Center} weight={Text.Weight.Medium}>
                        No budgets
                    </Text>
                </Box>
            )
        }

        return (
            <Box
                backgroundColor={Box.BackgroundColor.White}
                cornerRadius={Box.CornerRadius.Small}
                css={`
                    overflow-x: scroll;
                `}
            >
                <StyledTable>
                    <StyledTableHeader>
                        <tr>
                            <th style={{ width: '25%' }}>
                                <Text
                                    align={Text.Align.Left}
                                    weight={Text.Weight.Medium}
                                >
                                    Name
                                </Text>
                            </th>
                            <th style={{ width: '18.75%' }}>
                                <Text
                                    align={Text.Align.Left}
                                    weight={Text.Weight.Medium}
                                >
                                    Progress
                                </Text>
                            </th>
                            <th style={{ width: '18.75%' }}>
                                <Text
                                    align={Text.Align.Right}
                                    weight={Text.Weight.Medium}
                                >
                                    Budgeted
                                </Text>
                            </th>
                            <th style={{ width: '18.75%' }}>
                                <Text
                                    align={Text.Align.Right}
                                    weight={Text.Weight.Medium}
                                >
                                    Spent
                                </Text>
                            </th>
                            <th style={{ width: '18.75%' }}>
                                <Text
                                    align={Text.Align.Right}
                                    weight={Text.Weight.Medium}
                                >
                                    Remaining
                                </Text>
                            </th>
                        </tr>
                    </StyledTableHeader>
                    <tbody>
                        {budgets.map(budget => (
                            <TableRow
                                key={budget.id}
                                id={budget.id}
                                name={budget.name}
                                budget={budget}
                                budgeted={budget.budgeted}
                                spent={budget.spent}
                            />
                        ))}
                        <TableRow
                            name={total.name}
                            budgeted={total.budgeted}
                            spent={total.spent}
                        />
                    </tbody>
                </StyledTable>
            </Box>
        )
    }
}

const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
`

const StyledTableHeader = styled.thead`
    background-color: ${props => props.theme.colors.white};
    th {
        border: 1px solid ${props => props.theme.colors.gray9};
        border-left: 0;
        border-right: 0;
        padding: 0.75rem 1rem 0.75rem;
        word-break: normal;
        &:first-child {
            border-right: 1px solid ${props => props.theme.colors.gray9};
        }
    }
`
