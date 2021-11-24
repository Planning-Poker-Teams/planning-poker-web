<template>
  <div>
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    />
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3 text-center">
        <p class="text-lg leading-6 font-medium text-gray-900">
          Change Card Deck
        </p>
        <div class="mt-2 px-7 py-3">
          <input
            class="mb-2 py-2 px-3 text-lg font-semi bg-white appearance-none border-2 rounded text-grey-darker focus:outline-none focus:border-green-300"
            type="text"
            v-model="cardDeckString"
          />
        </div>
        <div class="items-center px-4 py-3">
          <button
            class="mr-1 px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-5/12 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            @click="changeCardDeck"
          >
            OK
          </button>
          <button
            class="ml-1 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-5/12 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            @click="hideChangeDeckModal"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ChangeCardDeckDialog extends Vue {
  @Prop() private currentCardDeck!: string[];

  cardDeckString = this.currentCardDeck.join(', ');

  hideChangeDeckModal() {
    this.$emit('hide_change_deck_modal');
  }

  changeCardDeck() {
    this.$emit('change_deck', this.cardDeckString.split(/[ ,]+/));
  }
}
</script>
