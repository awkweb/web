import * as React from 'react'
import Select from 'react-select'
// tslint:disable-next-line
import { ActionMeta, GroupType, ValueType } from 'react-select/lib/types'
import { css } from 'styled-components'

import field from '../../../theme/field'
import { AnyColor as Color } from '../../../types/color'
import { Size, Weight } from '../../../types/text'
import { cssFactory } from '../../../utils/styled-components'
import { StyledFieldset, StyledLabel } from '../../form/Field'
import { Box } from '../../layout/Box'

interface Props {
    error?: string
    id: string
    options?: Array<GroupType<any>> | any[] | undefined
    placeholder: string
    value: any
    onChange: (
        value: ValueType<{
            value: string
            label: string
        }>,
        action: ActionMeta,
    ) => void
}

export class SelectField extends React.Component<Props> {
    public state = { isTouched: false }

    public render() {
        const { error, id, options, placeholder, value, onChange } = this.props
        const { isTouched } = this.state
        const hasError = isTouched && !!error
        return (
            <Box css={genInputCSS(hasError)}>
                <StyledFieldset>
                    <StyledLabel
                        {...{
                            active: !!value || hasError,
                            error: hasError,
                            htmlFor: id,
                        }}
                    >
                        {hasError ? error : placeholder}
                    </StyledLabel>
                    <Select
                        classNamePrefix="react-select"
                        menuPlacement="auto"
                        name={id}
                        placeholder={hasError ? '' : placeholder}
                        options={options}
                        value={value}
                        onBlur={this.onBlur}
                        onChange={onChange}
                    />
                </StyledFieldset>
            </Box>
        )
    }

    private onBlur = () => {
        const { isTouched } = this.state
        if (!isTouched) {
            this.setState({
                isTouched: true,
            })
        }
    }
}

const genInputCSS = (error: boolean) =>
    cssFactory(css)`
	.react-select__control {
		border: ${props =>
            field.getBorderStyle(Color.Gray8, props.theme.colors, error)};
		font-weight: ${props => props.theme.text.getWeight(Weight.Normal)};
		font-size: ${props => props.theme.text.getSize(Size.Md)};
		height: 2.8125rem;
		padding: 0;
		outline: 0;
		transition: border-color 125ms;
        width: 100%;
        
        &:hover {
            border: ${props =>
                field.getBorderStyle(Color.Gray8, props.theme.colors, error)};
        }
    }

    .react-select__control--is-focused {
        border: ${props =>
            field.getFocusStyles(Color.Gold3, props.theme.colors, error)};
    }
    
    .react-select__value-container {
		padding: ${props => props.theme.units.getValues(field.padding.input)};
    }

    .react-select__indicator-separator {
        border-color: ${props => props.theme.colors.gray8};
    }

	.react-select__menu {
        top: 54px !important;
        width: 100%;
        z-index: ${props => props.theme.zIndex.Z_INDEX_2};
    }

    .react-select__option {
        font-size: ${props => props.theme.text.getSize(Size.Md)};
        padding: ${props => props.theme.units.getValues(field.padding.input)};
        padding-bottom: 0.65rem;
        padding-top: 0.65rem;
    }

    .react-select__single-value {
        color: ${props => props.theme.colors.gray1};
        font-size: ${props => props.theme.text.getSize(Size.Md)};
        margin: 0;
    }
`
