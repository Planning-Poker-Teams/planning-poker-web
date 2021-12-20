import { Ref, VueElement } from 'vue';

export default function useCardAnimation(
  selectedCard: VueElement,
  cardTargetField: Ref<Element | undefined>
) {
  const CARD_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
    duration: 500,
    fill: 'forwards',
    easing: 'ease-in-out',
  };
  type translates = { transform: string }[];
  let lastCardMovement: translates = [];
  const calculateAnimationTranslation = (card: VueElement): { x: number; y: number } => {
    const selectedCard = card;

    const selectedCardRect = selectedCard.$el.getBoundingClientRect();
    const selectedCardCentreCoordinates = {
      x: selectedCardRect.x + selectedCardRect.width / 2,
      y: selectedCardRect.y + selectedCardRect.height / 2,
    };

    if (typeof cardTargetField.value !== 'undefined') {
      const taskNameRect = cardTargetField.value.getBoundingClientRect();
      const taskNameCentreCoordinates = {
        x: taskNameRect.x + taskNameRect.width / 2,
        y: taskNameRect.y + taskNameRect.height / 2,
      };

      return {
        x: taskNameCentreCoordinates.x - selectedCardCentreCoordinates.x,
        y: taskNameCentreCoordinates.y - selectedCardCentreCoordinates.y,
      };
    }

    return { x: 0, y: 0 };
  };
  0;
  /**
   * return a random degree between -90° and 90°
   */
  const getRandomDegree = (): number => {
    return Math.random() * 180 - 90;
  };


  const getCardMovement = ({ x, y }: { x: number; y: number }, rotation: number): translates => {
    return [
      { transform: 'translate3D(0, 0, 0) rotate(0)' },
      {
        transform: `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`,
      },
    ];
  };

  const animateCardMovingForwards = (card: VueElement, cardMovement: translates): void => {
    card.$el.animate(cardMovement, CARD_ANIMATION_OPTIONS);
  };

  // Unfortunately not all browsers support `animation.reverse()`, so we have to create a separate animation manually
  const animateCardMovingBackwards = (card: VueElement, cardMovement: translates): void => {
    card.$el.animate(cardMovement, {
      ...CARD_ANIMATION_OPTIONS,
      direction: 'reverse',
    });
  };

  const animateCardSelection = (lastSelectedCard: VueElement | undefined): void => {
    if (lastSelectedCard && lastCardMovement) {
      animateCardMovingBackwards(lastSelectedCard, lastCardMovement);
    }

    const cardMovement = getCardMovement(
      calculateAnimationTranslation(selectedCard),
      getRandomDegree()
    );

    animateCardMovingForwards(selectedCard, cardMovement);

    lastCardMovement = cardMovement;
  };

  return {
    animateCardSelection,
  };
}
