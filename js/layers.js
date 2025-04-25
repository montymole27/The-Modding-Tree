var testTree = [["u"],["r"]]

addLayer("u", {
    name: "Upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "$", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('u', 15)) mult = mult.times(upgradeEffect('u', 15))
        if (hasUpgrade('u', 21)) mult = mult.times(upgradeEffect('u', 21))
        if (hasUpgrade('r', 13)) mult = mult.times(upgradeEffect('r', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "u: Reset for $", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "UPGRADE I",
            description: "Add to points",
            cost: new Decimal(1),
            effect() {
                let mult = new Decimal(0.1)
                if (hasUpgrade('u', 22)) mult = mult.times(upgradeEffect('u', 22))
                if (hasUpgrade('u', 23)) mult = mult.times(upgradeEffect('u', 23))
                return mult
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effe
            },
        12: {
            title: "UPGRADE II",
            description: "Multiply points",
            cost: new Decimal(3),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u', 11)) bool = true
                return bool;
            },
            effect() {
                let mult = new Decimal(1.25)
                if (hasUpgrade('u', 24)) mult = mult.times(upgradeEffect('u', 24))
                return mult
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
            },
        13: {
            title: "UPGRADE III",
            description: "$ boosts points",
            cost: new Decimal(5),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u', 12)) bool = true
                return bool;
            },
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effe
            },
        14: {
            title: "UPGRADE IV",
            description: "Points boost points",
            cost: new Decimal(10),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u', 13)) bool = true
                return bool;
            },
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effe
            },
        15: {
            title: "UPGRADE V",
            description: "$ boosts $",
            cost: new Decimal(15),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u', 14)) bool = true
                return bool;
            },
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effe
            },
        21: {
            title: "UPGRADE VI",
            description: "Points boost $",
            cost: new Decimal(25),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u', 15)) bool = true
                return bool;
            },
            effect() {
                 return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effe
            },
        22: {
            title: "UPGRADE VII",
            description: "$ boosts UPGRADE I",
            cost: new Decimal(50),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u',21)) bool = true
                return bool;
            },
            effect() {
                 return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effe
            },
        23: {
            title: "UPGRADE VIII",
            description: "Points boost UPGRADE I",
            cost: new Decimal(75),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u', 22)) bool = true
                return bool;
            },
            effect() {
                 return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effe
            },
        24: {
            title: "UPGRADE IX",
            description: "UPGRADE VII and UPGRADE VIII boost UPGRADE II",
            cost: new Decimal(150),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u', 23)) bool = true
                return bool;
            },
            effect() {
                let mult = upgradeEffect(this.layer, 22)
                mult = mult.times(upgradeEffect(this.layer, 23))
                return mult
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effe
            },
        25: {
            title: "UPGRADE X",
            description: "Unlock RESETS",
            cost: new Decimal(250),
            unlocked() {
                let bool = false;
                if (hasUpgrade('u', 24)) bool = true
                return bool;
            },
            },
        }
})

addLayer("r", {
    name: "Resets", // Display name
    symbol: "R", // Symbol on the node
    position: 0, // Horizontal position on the tree
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#888888",
    requires: new Decimal(250), // Requirement to unlock this layer
    resource: "R", // Name of resource
    baseResource: "$", // What you're gaining it from
    baseAmount() { return player['u'].points }, // How to calculate baseResource
    type: "static", // "normal" or "static"
    exponent: 1, // Prestige exponent

    gainMult() { // Multiplier to gain
        return new Decimal(1)
    },
    gainExp() { // Exponent to gain
        return new Decimal(1)
    },

    row: 1, // Row in the tree (row 0 is the first)
    branches: ["u"], // What layer this is connected to

    layerShown() {
        return player.r.unlocked || hasUpgrade('u', 25)
    },
    hotkeys: [
        {key: "r", description: "r: Reset for R", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "RESET I",
            description: "Multiply points",
            cost: new Decimal(1),
            effect() {
                let mult = new Decimal(2)
                return mult
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        12: {
            title: "RESET II",
            description: "R boosts points.",
            cost: new Decimal(2),
            unlocked() {
                let bool = false;
                if (hasUpgrade('r', 11)) bool = true
                return bool;
            },
            effect() {
                return player[this.layer].points.add(2).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        13: {
            title: "RESET III",
            description: "R boosts $.",
            cost: new Decimal(3),
            unlocked() {
                let bool = false;
                if (hasUpgrade('r', 12)) bool = true
                return bool;
            },
            effect() {
                return player[this.layer].points.add(2).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        }
    }
})
