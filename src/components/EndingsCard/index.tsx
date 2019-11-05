import { h, VNode } from "preact";
import { useState } from "preact/hooks";
import classnames from "classnames";

import { Character } from "../../data/character/type";
import {
  getAvailableRoutesFromEndings,
  getEndingContentForRoute,
} from "../../data/ending";
import { Ending, OrderedRoute } from "../../data/ending/type";

import styles from "./styles.css";

type Props = {
  className?: string;
  characterA: Character;
  characterB: Character;
  characterASlug: string;
  characterBSlug: string;
  endings: Ending[];
};

export default function EndingsCard(props: Props): VNode<Props> {
  const {
    className = "",
    characterA,
    characterB,
    characterASlug,
    characterBSlug,
    endings,
  } = props;
  const portraitAImageURL = `/${characterASlug}_l.png`;
  const portraitBImageURL = `/${characterBSlug}_l.png`;
  const availableRoutes = getAvailableRoutesFromEndings(endings);

  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const selectedRoute = availableRoutes[selectedRouteIndex];
  const selectedEndingContent = getEndingContentForRoute(
    endings,
    selectedRoute,
  );

  return (
    <div className={classnames(styles.endingsCard, className)}>
      <div
        className={styles.left}
        style={{
          backgroundImage:
            endings.length > 0
              ? `url(/${getRouteFaction(selectedRoute)}_emblem_l.png)`
              : "none",
        }}
      >
        <div className={styles.character}>
          <img src={portraitAImageURL} className={styles.portrait} />
          <Badge name={characterA} className={styles.badge} />
        </div>
        <div className={classnames(styles.character, styles.characterB)}>
          <img
            src={portraitBImageURL}
            className={classnames(styles.portrait, styles.portraitB)}
          />
          <Badge
            name={characterB}
            className={classnames(styles.badge, styles.badgeB)}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.routes}>
          {availableRoutes.map((route: OrderedRoute, index: number) => {
            const faction = getRouteFaction(route);
            const factionSrcSetWEBP = `/${faction}_emblem@1x.webp 1x, /${faction}_emblem@2x.webp 2x, /${faction}_emblem@3x.webp 3x`;
            const factionSrcSetPNG = `/${faction}_emblem@1x.png 1x, /${faction}_emblem@2x.png 2x, /${faction}_emblem@3x.png 3x`;
            return (
              <picture className={styles.factionPicture} key={route}>
                <source type="image/webp" srcSet={factionSrcSetWEBP} />
                <source type="image/png" srcSet={factionSrcSetPNG} />
                <img
                  className={classnames(styles.factionImage, {
                    [styles.factionImageSelected]: selectedRouteIndex === index,
                  })}
                  srcSet={factionSrcSetPNG}
                  onClick={(): void => setSelectedRouteIndex(index)}
                />
              </picture>
            );
          })}
        </div>
        <div className={styles.content}>
          {selectedEndingContent != null
            ? selectedEndingContent
                .split("\n")
                .map((ending: string, index: number) => (
                  <div key={index}>{ending}</div>
                ))
            : null}
          <div className={styles.contentBackground} />
        </div>
      </div>
    </div>
  );
}

type BadgeProps = {
  className?: string;
  name: string;
};

function Badge(props: BadgeProps): VNode<BadgeProps> {
  const { className, name } = props;

  return (
    <div className={classnames(styles.badge, className)}>
      <SVGBadge />
      <span className={styles.badgeText}>{name}</span>
    </div>
  );
}

function SVGBadge(): VNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 318 42"
      className={styles.badgeSvg}
    >
      <defs>
        <radialGradient r="90%" id="gradient">
          <stop offset="0%" style={{ stopColor: "#3c2e4f" }} />
          <stop offset="100%" style={{ stopColor: "#0d0a11" }} />
        </radialGradient>
      </defs>
      <g>
        <path
          d="M1.75 21.25L20 2.75h278.62L317.5 20.5 299 39.37H19.62L1.75 21.25z"
          strokeOpacity="null"
          strokeWidth="3"
          stroke="#aba38c"
          fill="url(#gradient)"
        />
      </g>
    </svg>
  );
}

function getRouteFaction(route: OrderedRoute): string {
  if (route === 0) {
    return "empire";
  } else if (route === 1) {
    return "holy";
  } else if (route === 2) {
    return "alliance";
  } else {
    return "church";
  }
}
