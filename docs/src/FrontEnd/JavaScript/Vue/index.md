### Vuex 语法糖

```js
import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
...mapMutations("moduleA",['changeName','changeTest'])

 * mapState,mapGetters必须放在computed里面, mapMutations,mapActions必须放在methods里面
```
