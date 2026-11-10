export type DealtCards = Card[];

export type Card =
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | TenValueCard
  | "ace";

type TenValueCard = "ten" | FaceCard;

type FaceCard = "jack" | "queen" | "king";

type HandOutcome = "below" | "above" | "blackjack";

export type BlackjackHighestResult = `${HandOutcome} ${Card}`;

const TEN_CARD_PRIORITY: Record<TenValueCard, number> = {
  ten: 1,
  jack: 2,
  queen: 3,
  king: 4,
};

const CARD_VALUE: Record<Card, number> = {
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  jack: 10,
  queen: 10,
  king: 10,
  ace: 11,
};

const BLACKJACK = 21;
const ACE_LOW_DIFFERENCE = 10;

export function blackjackHighest(
  dealtCards: DealtCards,
): BlackjackHighestResult {
  if (dealtCards.length === 0)
    throw new Error("A hand needs at least one card");

  let sumOfHand = 0;
  let highestCard: Card = "two";
  let aceCount = 0;

  for (const card of dealtCards) {
    sumOfHand += CARD_VALUE[card];
    if (card === "ace") {
      aceCount++;
    } else {
      highestCard = compareCards(card, highestCard);
    }
  }

  [aceCount, sumOfHand] = adjustHandForAces(aceCount, sumOfHand);

  if (aceCount > 0) {
    highestCard = "ace";
  }

  const outcome = handOutcome(sumOfHand);

  return `${outcome} ${highestCard}`;
}

function isTenValueCard(card: Card): card is TenValueCard {
  return card in TEN_CARD_PRIORITY;
}

function compareCards(cardA: Card, cardB: Card): Card {
  if (CARD_VALUE[cardB] < CARD_VALUE[cardA]) {
    return cardA;
  }
  if (
    isTenValueCard(cardA) &&
    isTenValueCard(cardB) &&
    TEN_CARD_PRIORITY[cardB] < TEN_CARD_PRIORITY[cardA]
  ) {
    return cardA;
  }
  return cardB;
}

function adjustHandForAces(
  aceCount: number,
  sumOfHand: number,
): [aceCount: number, sumOfHand: number] {
  while (sumOfHand > BLACKJACK && aceCount > 0) {
    sumOfHand -= ACE_LOW_DIFFERENCE;
    aceCount--;
  }

  return [aceCount, sumOfHand];
}

function handOutcome(sumOfHand: number): HandOutcome {
  if (sumOfHand < BLACKJACK) return "below";
  if (sumOfHand === BLACKJACK) return "blackjack";
  return "above";
}
