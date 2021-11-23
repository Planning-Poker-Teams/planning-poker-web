<template>
  <div
    class="h-full w-full flex flex-col items-center bg-gray-100 lg:shadow-lg lg:rounded-lg relative overflow-y-scroll"
  >
    <room-header
      v-on:show_change_deck_modal="showChangeDeckModal = true"
      :participants="participants"
      :roomName="roomName"
    />
    <change-card-deck
      v-if="showChangeDeckModal"
      v-on:hide_change_deck_modal="showChangeDeckModal = false"
    />
    <ongoing-estimation
      v-if="isEstimationOngoing"
      :taskName="taskName"
      @send-estimation="sendEstimation"
      @request-result="requestResult"
    />
    <estimation-result v-if="estimationResultAvailable" />
    <start-estimation-form
      v-if="!isEstimationOngoing"
      @start-estimation="startEstimation"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RoomHeader from '@/components/RoomHeader.vue';
import ChangeCardDeck from '@/components/ChangeCardDeck.vue';
import StartEstimationForm from '@/components/StartEstimationForm.vue';
import OngoingEstimation from '@/components/OngoingEstimation.vue';
import EstimationResult from '@/components/EstimationResult.vue';
import { Participant } from '@/store/types';
import { Actions } from '@/store/actions';
import { EstimationState } from '@/store/getters';

@Component({
  components: {
    RoomHeader,
    ChangeCardDeck,
    StartEstimationForm,
    OngoingEstimation,
    EstimationResult,
  },
})
export default class Room extends Vue {
  private showChangeDeckModal = false;

  mounted() {
    const roomNameParam = this.$route.params.roomName;
    const roomName = this.$store.state.room?.name;

    if (!this.$store.state.room || roomName !== roomNameParam) {
      this.$router.push({ name: 'lobby', query: { room: roomNameParam } });
    }
    this.$store.dispatch(Actions.ENTER_ROOM);
  }

  beforeDestroy() {
    this.$store.dispatch(Actions.LEAVE_ROOM);
  }

  startEstimation(taskName: string) {
    this.$store.dispatch(Actions.REQUEST_START_ESTIMATION, taskName);
  }

  sendEstimation(value: string) {
    this.$store.dispatch(Actions.SEND_ESTIMATION, value);
  }

  requestResult() {
    this.$store.dispatch(Actions.REQUEST_RESULT);
  }

  get participants(): Participant[] {
    return this.$store.state.participants;
  }

  get roomName(): string | undefined {
    return this.$store.state.room?.name;
  }

  get taskName(): string | undefined {
    return this.$store.state.ongoingEstimation?.taskName;
  }

  get isEstimationOngoing(): boolean {
    return this.$store.getters.estimationState == EstimationState.ONGOING;
  }

  get estimationResultAvailable() {
    return this.$store.state.estimationResult !== undefined;
  }
}
</script>
