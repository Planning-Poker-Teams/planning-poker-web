<template>
  <div
    class="sticky top-0 bg-white dark:bg-gray-500 rounded-t-lg z-10 w-full flex flex-col border-b dark:border-gray-400 shadow-sm"
  >
    <div
      class="w-full min-h-16 flex justify-center items-center relative overflow-hidden"
    >
      <div class="absolute top-0 left-0 flex items-center m-2">
        <img
          class="object-contain h-12 shadow-md rounded-lg mr-2"
          alt="Planning Poker App logo"
          src="../assets/planning-poker-app-icon.png"
        />
        <h2
          class="hidden lg:inline font-medium dark:text-gray-200 font-sans select-none"
        >
          Planning Poker
          <br />for teams
        </h2>
      </div>
      <h1
        class="w:3/5 flex-1 text-center text-2xl dark:text-gray-200 m-0 font-sans font-bold"
      >
        {{ roomName }}
      </h1>
      <button
        class="m-2 px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 p-2 border-2 hover:border-gray-400 dark:hover:border-gray-400 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-400 rounded"
        type="button"
        @click="leaveRoom"
      >
        <span class="hidden lg:inline mr-2">Leave room</span>
        <font-awesome-icon icon="door-open" />
      </button>
    </div>
    <participants-list :participants="participants" />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ParticipantsList from './ParticipantsList.vue';
import { Participant } from '../store/types';

@Component({
  components: { ParticipantsList, FontAwesomeIcon },
})
export default class RoomInformation extends Vue {
  @Prop() private roomName!: string;
  @Prop() private participants!: Participant[];

  leaveRoom() {
    this.$router.push({ name: 'lobby', query: { room: this.roomName } });
  }
}
</script>
