import React from 'react'

import { Item } from '../../../../types/item'
import { Button } from '../../actions/Button'

interface Props {
    apiVersion?: string
    children?: React.ReactNode
    clientName?: string
    env: string
    institution?: string
    onClick?: () => void
    onEvent?: () => void
    onExit?: () => void
    onLoad?: () => void
    onSuccess: (token: string, data: Item) => void
    noBackground: boolean
    noBorder: boolean
    product?: string[]
    publicKey?: string
    selectAccount?: boolean
    token?: string
    webhook?: string
}

/**
 * Modified from [`react-plaid-link`](https://github.com/pbernasconi/react-plaid-link/blob/master/src/PlaidLink.js)
 */
export class PlaidLink extends React.Component<Props> {
    public static defaultProps = {
        apiVersion: 'v2',
        clientName: 'Butter',
        env: (process.env.REACT_APP_PLAID_ENV as string) || 'sandbox',
        institution: null,
        noBackground: false,
        noBorder: false,
        product: ['transactions'],
        publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY as string,
        selectAccount: true,
        token: null,
        webhook:
            process.env.NODE_ENV === 'production'
                ? 'https://api.butter.so/v1/items/hooks/'
                : `http://${
                      process.env.REACT_APP_NGROK_ID
                  }.ngrok.io/v1/items/hooks/`,
    }
    public state = {
        disabledButton: true,
        linkLoaded: false,
        initializeURL:
            'https://cdn.plaid.com/link/v2/stable/link-initialize.js',
    }

    public async componentDidMount() {
        try {
            const { initializeURL } = this.state
            await this.loadScript(initializeURL)
            this.onScriptLoaded()
        } catch (e) {
            this.onScriptError()
        }
    }

    public loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve()
                return
            }
            const el = document.createElement('script')
            el.type = 'text/javascript'
            el.async = true
            el.src = src
            el.addEventListener('load', resolve)
            el.addEventListener('error', reject)
            el.addEventListener('abort', reject)
            document.head.appendChild(el)
        })
    }

    public onScriptError = () => {
        // tslint:disable-next-line
        console.error(
            'There was an issue loading the link-initialize.js script',
        )
    }

    public onScriptLoaded = () => {
        const reactWindow = window as any
        const {
            apiVersion,
            clientName,
            env,
            publicKey,
            onExit,
            onEvent,
            onSuccess,
            product,
            selectAccount,
            token,
            webhook,
        } = this.props
        reactWindow.linkHandler = reactWindow.Plaid.create({
            apiVersion,
            clientName,
            env,
            onExit,
            onEvent,
            onSuccess,
            product,
            selectAccount,
            token,
            webhook,
            key: publicKey,
            onLoad: this.handleLinkOnLoad,
        })

        this.setState({ disabledButton: false })
    }

    public handleLinkOnLoad = () => {
        const { onLoad } = this.props
        if (onLoad != null) {
            onLoad()
        }
        this.setState({ linkLoaded: true })
    }

    public handleOnClick = () => {
        const { institution, onClick } = this.props
        if (onClick != null) {
            onClick()
        }
        const reactWindow = window as any
        if (reactWindow.linkHandler) {
            reactWindow.linkHandler.open(institution)
        }
    }

    public exit = (configurationObject: object) => {
        const reactWindow = window as any
        if (reactWindow.linkHandler) {
            reactWindow.linkHandler.exit(configurationObject)
        }
    }

    public render() {
        const { disabledButton } = this.state
        const { children, noBackground, noBorder } = this.props
        return (
            <Button
                disabled={disabledButton}
                noBackground={noBackground}
                noBorder={noBorder}
                noWrap
                onClick={this.handleOnClick}
            >
                {children}
            </Button>
        )
    }
}
