import { APARTMENT_FEATURES } from "@/constants/features";
import css from "./FeaturesList.module.css";
import { IoCheckmark, IoClose } from "react-icons/io5";

interface FeaturesListProps {
  features: string[];
}

function FeaturesList({ features }: FeaturesListProps) {
  const sortedFeatures = [...APARTMENT_FEATURES].sort((a, b) => {
    const aIncluded = features.includes(a.id);
    const bIncluded = features.includes(b.id);

    if (aIncluded && !bIncluded) return -1;
    if (!aIncluded && bIncluded) return 1;
    return 0;
  });
  return (
    <ul className={css.featuresList}>
      {sortedFeatures.map((item) => {
        const isIncluded = features.includes(item.id);

        return (
          <li
            key={item.id}
            className={`${css.featuresItem} ${!isIncluded ? css.notIncluded : ""}`}
          >
            {isIncluded ? (
              <span className={`${css.iconWrapper} ${css.include}`}>
                <IoCheckmark className={css.checkIcon} />
              </span>
            ) : (
              <span className={`${css.iconWrapper} ${css.notInclude}`}>
                <IoClose className={css.closeIcon} />
              </span>
            )}

            <span className={css.text}>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default FeaturesList;
