<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column align-items-center">
    <div class="row">
      <div class="col-md-12">
        <h1>How it Works</h1>
      </div>
    </div>

    <div class="row justify-content-around">
      <div class="col-md-4">
        <img src="//placehold.it/200x200" alt="">
        <h2>Create</h2>
        <p class="text-left">
          Start your household <br>Add household members<br>Invite members with your household's unique passcode
        </p>
      </div>
      <div class="col-md-4">
        <img src="//placehold.it/200x200" alt="">
        <h2>Customize</h2>
        <p class="text-left">
          Add "shelves"<br>Add items to your shelves<br>Utilize a shopping list
        </p>
      </div>
      <div class="col-md-4">
        <img src="//placehold.it/200x200" alt="">
        <h2>Organize</h2>
        <p class="text-left">
          Access your accurate item quantities<br>Get notified on expiration dates or when your item quantity reaches a certain number<br>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="shadow p-5 my-5 vw-75">
          <div class="text-left">
            <h3>
              Create Your Household!
            </h3>
            <p>1. Login or register an account to create a household!</p>
            <button class="btn btn-outline-primary"></button>
            <p>2. Create your household!</p>
            <button class="btn btn-outline-primary">
              Start your Household
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="shadow p-5 my-5 vw-75">
          <div class="text-left">
            <h3>
              Create Your Household!
            </h3>
            <p>1. Login or register an account to create a household!</p>
            <p>2. Create your household!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
