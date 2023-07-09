import React from "react";
import { LaunchIcon } from "@sanity/icons";

const ExternalLinkRenderer = (props: {
  renderDefault: (
    arg0: any
  ) =>
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  value: { href: string | undefined };
}) => (
  <span>
    {props.renderDefault(props)}
    <a contentEditable={false} href={props.value.href}>
      <LaunchIcon />
    </a>
  </span>
);

export default ExternalLinkRenderer;
