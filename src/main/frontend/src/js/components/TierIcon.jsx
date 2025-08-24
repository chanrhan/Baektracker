import styles from "../../css/styles.module.css";
import React from "react";

export function TierIcon({tier, size, showText}){
    return  null;
    const getTierInfo = (tier) => {
        const tierLower = tier.toLowerCase()

        if (tierLower.includes("bronze")) {
            return {
                color: "#cd7f32",
                bgColor: "#f4e4bc",
                icon: "🥉",
                name: tier,
            }
        }
        if (tierLower.includes("silver")) {
            return {
                color: "#c0c0c0",
                bgColor: "#f0f0f0",
                icon: "🥈",
                name: tier,
            }
        }
        if (tierLower.includes("gold")) {
            return {
                color: "#ffd700",
                bgColor: "#fff8dc",
                icon: "🥇",
                name: tier,
            }
        }
        if (tierLower.includes("platinum")) {
            return {
                color: "#00ff9f",
                bgColor: "#e6fff9",
                icon: "💎",
                name: tier,
            }
        }
        if (tierLower.includes("diamond")) {
            return {
                color: "#00bfff",
                bgColor: "#e6f7ff",
                icon: "💠",
                name: tier,
            }
        }
        if (tierLower.includes("ruby")) {
            return {
                color: "#ff0040",
                bgColor: "#ffe6ec",
                icon: "🔴",
                name: tier,
            }
        }

        return {
            color: "#6b7280",
            bgColor: "#f3f4f6",
            icon: "⚪",
            name: tier,
        }
    }

    const tierInfo = getTierInfo(tier)
    const sizeClasses = {
        small: styles.tierIconSmall,
        medium: styles.tierIconMedium,
        large: styles.tierIconLarge,
    }

    return (
        <div className={styles.tierIconContainer}>
            <div
                className={`${sizeClasses[size]} ${styles.tierIcon}`}
                style={{
                    backgroundColor: tierInfo.bgColor,
                    color: tierInfo.color,
                    border: `1px solid ${tierInfo.color}40`,
                }}
            >
                {tierInfo.icon}
            </div>
            {showText && (
                <span className={styles.tierIconText} style={{ color: tierInfo.color }}>
          {tierInfo.name}
        </span>
            )}
        </div>
    )
}