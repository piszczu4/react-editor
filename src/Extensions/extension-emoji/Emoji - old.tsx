import { PureComponent } from "react";

import { ResourcedEmoji } from "@atlaskit/emoji/element";
import { EmojiResourceConfig } from "@atlaskit/emoji/resource";
import { EmojiId } from "@atlaskit/emoji/types";

import ProviderFactory from "./provider-factory/provider-factory";
import { Providers } from "./provider-factory/types";
import { WithProviders } from "./provider-factory/with-providers";

export interface EmojiProps extends EmojiId {
	allowTextFallback?: boolean;
	providers?: ProviderFactory;
	fitToHeight?: number;
	showTooltip?: boolean;
	resourceConfig?: EmojiResourceConfig;
}

export default class EmojiNode extends PureComponent<EmojiProps, {}> {
	static displayName = "EmojiNode";
	static defaultProps = {
		showTooltip: true,
	};

	private providerFactory: ProviderFactory;

	constructor(props: EmojiProps) {
		super(props);
		this.providerFactory = props.providers || new ProviderFactory();
	}

	componentWillUnmount() {
		if (!this.props.providers) {
			// new ProviderFactory is created if no `providers` has been set
			// in this case when component is unmounted it's safe to destroy this providerFactory
			this.providerFactory.destroy();
		}
	}

	private renderWithProvider = (providers: Providers) => {
		const {
			allowTextFallback,
			shortName,
			id,
			fallback,
			fitToHeight,
			showTooltip,
			resourceConfig,
		} = this.props;

		if (allowTextFallback && !providers.emojiProvider) {
			return (
				<span
					data-emoji-id={id}
					data-emoji-short-name={shortName}
					data-emoji-text={fallback || shortName}
				>
					{fallback || shortName}
				</span>
			);
		}

		if (!providers.emojiProvider) {
			return null;
		}

		return (
			<ResourcedEmoji
				emojiId={{ id, fallback, shortName }}
				emojiProvider={providers.emojiProvider}
				showTooltip={showTooltip}
				fitToHeight={fitToHeight}
				optimistic
				optimisticImageURL={resourceConfig?.optimisticImageApi?.getUrl({
					id,
					fallback,
					shortName,
				})}
			/>
		);
	};

	render() {
		return (
			<WithProviders
				providers={["emojiProvider"]}
				providerFactory={this.providerFactory}
				renderNode={this.renderWithProvider}
			/>
		);
	}
}
