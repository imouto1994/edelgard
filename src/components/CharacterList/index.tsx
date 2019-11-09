import styles from "./styles.css";

import { h, VNode } from "preact";
import { useLocation, Link } from "wouter-preact";

import Lazy from "../Lazy";
import {
  orderedCharacterFactionIndices,
  orderedFactions,
  characterOrderedIndexMap,
} from "../../data/character";
import { Character } from "../../data/character/type";
import { slugify } from "../../utils/string";

type Props = {
  characters: readonly Character[];
};

export default function CharacterList(props: Props): VNode<Props> {
  const { characters } = props;

  return (
    <div className={styles.characterList}>
      {characters.map((character: Character) => (
        <CharacterItem key={character} character={character} />
      ))}
    </div>
  );
}

type CharacterItemProps = {
  character: Character;
};

function CharacterItem(props: CharacterItemProps): VNode<CharacterItemProps> {
  const { character } = props;
  const { ASSETS_VERSION } = process.env;
  const characterSlug = slugify(character);
  const faction =
    orderedFactions[
      orderedCharacterFactionIndices[characterOrderedIndexMap[character]]
    ];
  const [location] = useLocation();

  const portraitSrcSetPNG = `/${characterSlug}_y_s@1x-${ASSETS_VERSION}.png 1x, /${characterSlug}_y_s@2x-${ASSETS_VERSION}.png 2x, /${characterSlug}_y_s@3x-${ASSETS_VERSION}.png 3x`;
  const portraitSrcSetWEBP = `/${characterSlug}_y_s@1x-${ASSETS_VERSION}.webp 1x, /${characterSlug}_y_s@2x-${ASSETS_VERSION}.webp 2x, /${characterSlug}_y_s@3x-${ASSETS_VERSION}.webp 3x`;
  const factionSrcSetPNG = `/${faction}_emblem@1x-${ASSETS_VERSION}.png 1x, /${faction}_emblem@2x-${ASSETS_VERSION}.png 2x, /${faction}_emblem@3x-${ASSETS_VERSION}.png 3x`;
  const factionSrcSetWEBP = `/${faction}_emblem@1x-${ASSETS_VERSION}.webp 1x, /${faction}_emblem@2x-${ASSETS_VERSION}.webp 2x, /${faction}_emblem@3x-${ASSETS_VERSION}.webp 3x`;

  return (
    <Link
      className={styles.characterEntry}
      href={`${location === "/" ? "" : location}/${slugify(character)}`}
    >
      <div className={styles.portraitContainer}>
        <div className={styles.portraitWrapper}>
          <Lazy className={styles.portraitPictureLazy}>
            <picture className={styles.portraitPicture}>
              <source type="image/webp" srcSet={portraitSrcSetWEBP} />
              <source type="image/png" srcSet={portraitSrcSetPNG} />
              <img
                alt={`${character} Portrait`}
                className={styles.portraitImg}
                srcSet={portraitSrcSetPNG}
              />
            </picture>
          </Lazy>
          {faction != null ? (
            <Lazy className={styles.factionPictureLazy}>
              <picture className={styles.factionPicture}>
                <source type="image/webp" srcSet={factionSrcSetWEBP} />
                <source type="image/png" srcSet={factionSrcSetPNG} />
                <img
                  alt={`${character} Faction`}
                  className={styles.factionImg}
                  srcSet={factionSrcSetPNG}
                />
              </picture>
            </Lazy>
          ) : null}
        </div>
      </div>
      <div className={styles.contentContainer}>
        <span>{character}</span>
      </div>
    </Link>
  );
}
