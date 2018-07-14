Vue.component('Navbar', {
  template: `<div id="top" class="flex flex-nowrap justify-between pv4 ph5 black bg-black-05 w-100">

  <!-- Left -->
  <div id="topleft" class="flex items-center">
    <div class="flex items-center mv2 mv1-ns">

      <div class="mh3 pointer dim" id="closeBtn" v-if="showPointer" onclick="closeView()">
        <i class="material-icons md-36 f2">arrow_back</i>
      </div>
      <slot></slot>

    </div>
  </div>

  <!-- Right -->
  <div id="topright" class="flex items-center">
    <i id="toggle-train-list" class="material-icons md-36 pointer dim">view_list</i>
  </div>

</div>
    `,
  props: ['showPointer']
});

Vue.component('train-status', {
  template: `<div class="flex items-center justify-between mv3 ph3"
  v-bind:class="{pv3: focus, 'bg-white': focus, ba: focus, 'b--black-50': focus, br2: focus}">
  <div class="flex items-center flex-grow-1">
    <img src="assets/img/train-icon.svg" class="h2 mr2">
    <template v-if="direction == 'NB'">
      <i class="material-icons mr2">arrow_upward</i>
      <h3 class="f4 ma0 black--80">Roosevelt</h3>
    </template>
    <template v-else>
      <i class="material-icons mr2">arrow_downward</i>
      <h3 class="f4 ma0 black--80">Baclaran</h3>
    </template>
  </div>
  <h3 class="f3 ma0 black--80">{{ Math.floor(time) }}m</h3>
</div>
  `,
  props: ['focus', 'time', 'direction']
});

Vue.component('card', {
  template: `<div class="w5 ba b--black-40 br2 mr4" v-bind:class="{pointer: clickable, dim: clickable}">
  <div class="aspect-ratio aspect-ratio--16x9 br2 br--top">
    <div class="aspect-ratio--object cover" v-bind:style="{ background: 'url(' + image + ')' }"></div>
  </div>
  <div class="card-bottom ph3 mv2 h4 overflow-y-hidden">
    <slot></slot>
  </div>
</div>`,
  props: ['image', 'clickable']
});

Vue.component('card-trip', {
  template: `<card v-bind:image="image" clickable="true">
  <h3 class="f3 mt2 mb0 truncate">{{ name }}</h3>
  <p class="mv1 lh-copy f6">{{ description }}</p>
</card>`,
  props: ['image', 'name', 'description']
})

Vue.component('card-attraction', {
  template: `<card v-bind:image="image" clickable="true">
  <h3 class="f3 mt2 mb0 truncate">{{ name }}</h3>
  <p class="mv1 f6 flex items-center">
    <i class="material-icons md-18 mr1">train</i>{{ stationName }}</p>
  <p class="lh-copy f7 mt2">{{ description }}</p>
</card>`,
  props: ['image', 'name', 'stationName', 'description']
})

Vue.component('load', {
  template: `<div class="flex items-center">
  <img v-bind:src="'assets/img/load-' + load + '.svg'" class="ml2 h2">
  <p class="black-70 ma0 f6 fw9 ttu">{{ load }}</p>
</div>`,
  props: ['load']
})
