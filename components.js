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
