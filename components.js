Vue.component('Navbar', {
  template: `<div id="top" class="flex flex-nowrap justify-between pv4 ph5 black bg-black-05 w-100">

  <!-- Left -->
  <div id="topleft" class="flex items-center">
    <div class="flex items-center mv2 mv1-ns">

      <div class="mh3 pointer" id="closeBtn" v-if="showPointer" onclick="closeView()">
        <i class="material-icons md-36 f2">arrow_back</i>
      </div>
      <slot></slot>

    </div>
  </div>

  <!-- Right -->
  <div id="topright" class="flex items-center">
    <i id="toggle-train-list" class="material-icons md-36 pointer">view_list</i>
  </div>

</div>
    `,
  props: ['showPointer']
})

Vue.component('TrainStatus', {
  template: `<div class="flex items-center justify-between mv3 ph3"
  v-bind:class="{pv3: focus, bg-white: focus, ba: focus, b--black-50: focus, br2: focus}">
  <div class="flex items-center flex-grow-1">
    <img src="assets/img/train-icon.svg" class="h2 mr2">
      <i class="material-icons mr2">arrow_upward</i>
      <h3 class="f4 ma0 black--80">Baclaran</h3>
          </div>
    <h3 class="f3 ma0 black--80">7m</h3>
  </div>
</div>
  `,
  props: ['focus']
})
