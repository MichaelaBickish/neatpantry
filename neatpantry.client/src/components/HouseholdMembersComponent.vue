<template>
  <div class="row mt-5">
    <div class="col">
      <div class="card w-75">
        <div class="card-body">
          <h5 class="card-title">
            Card title
            <!-- Household member profile name and profile picture -->
          </h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
            <!-- Household member email -->
          </p>
          <button type="button" class="btn btn-primary">
            <!-- @click="deleteCollaborator(householdMemberProp.id)" -->
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Notification from '../utils/Notification'

export default {
  name: 'HouseholdMember',
  props: {
    householdMemberProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      // TODO
      // async deleteCollaborator(id) {
      //   try {
      //     if (await Notification.confirmAction('Are you sure you want to remove this member?')) {
      //       await householdsService.deleteCollaborator(id) NOTE is this the right place for this???
      //       await householdsService.getAllHouseholdMembers(props.householdMemberProp.bug)
      //       Notification.toast('Note Deleted', 'success')
      //     }
      //   } catch (error) {
      //     Notification.toast('You cannot delete that!: ' + error, 'error')
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style>

</style>
