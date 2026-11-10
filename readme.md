# Blackjack Highest

## How to

Clone the repository using the template function and create youre own repository and submit that when you're happy with
you're code :D

## Rules

Have the function `blackjackHighest(strArr)` take the strArr parameter being passed which will be an array of numbers
and letters representing blackjack cards. Numbers in the array will be written out. So for example strArr may be
`["two","three","ace","king"]`. The full list of possibilities for strArr is: two, three, four, five, six, seven, eight,
nine, ten, jack, queen, king, ace. Your program should output below, above, or blackjack signifying if you have
blackjack (numbers add up to 21) or not and the highest card in your hand in relation to whether or not you have
blackjack. If the array contains an ace but your hand will go above 21, you must count the ace as a 1. You must always
try and stay below the 21 mark. So using the array mentioned above, the output should be below king. The ace is counted
as a 1 in this example because if it wasn't you would be above the 21 mark.

Another example would be if strArr was `["four","ten","king"]`, the output here should be above king. If you have a tie
between a ten and a face card in your hand, return the face card as the "highest card". If you have multiple face cards,
the order of importance is jack, queen, king.

## Install

```
npm install
```

## Test

```
npm test
```

# My approach 

## Logic flow

- If the hand is empty, throw an error: there is no highest card, so there is no valid answer.
- Go through the cards once:
  - Add each card's value to the sum, counting aces as 11.
  - Count the aces.
  - Track the highest non ace card. Ties between ten-value cards follow the README: ten < jack < queen < king.
- While the sum is over 21 and an ace is still worth 11, change one ace from 11 to 1 (subtract 10).
- If an ace is still worth 11, the ace is the highest card.
- Turn the sum into an outcome: below, blackjack or above.
- Return the outcome and the highest card.

## Design decisions

- **Strict types.** Cards are a union type, and both tables are typed as `Record`s, so a misspelled card name is a compile error instead of a silent `NaN`. `FaceCard` and `TenValueCard` name the groups the README talks about, so the types read like the rules.
- **Tie-break mirrors the README.** Cards are compared by value first, and ties between ten-value cards use a separate priority table (ten < jack < queen < king), so the code follows the README's wording directly.
- **`highestCard` starts at "two", not `undefined`.** This keeps the variable a single type with no extra checks. It's safe because two is the lowest non ace card, the hand is never empty, and a hand of only aces always keeps one ace at 11.
- **An ace is only the highest card while it's worth 11.** This is what the tests expect, for example `four, four, four, four, four, ace` gives "blackjack four."
- **An empty hand throws.** There's no highest card to report, so there's no valid answer to return.

