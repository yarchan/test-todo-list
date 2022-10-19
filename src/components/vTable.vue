<template>
  <div class="table">
    <div class="table__header">
      <div class="table__header-th">
        <label for="">Описание</label>
      </div>
      <div class="table__header-th">
        <label for="">Статус</label>
      </div>
      <div class="table__header-th">
        <label for="">Дата</label>
      </div>
    </div>
    <ul class="table__body" >
      <transition-group name="flip-list" tag="ul" 
        v-bind:css="false"
        >
        <li  v-for="task in computedTask" :key="task.taskKey" 
            class="table__body-tr"  
            @click="searchTaskFunc"
            :class="{'search-animation': searchTask.includes(task.taskKey) }"
          >
          <button class="table__body-td-check" 
            :class="{'status-active':task.isDone}" @click="taskDone(task.taskKey)" >
              <img 
                src="../assets/Check.svg" 
                class="table__body-td-check-img" 
                :class="{'status-img-active':task.isDone}"              
              >
          </button>
          <div class="table__body-td">
            {{task.value}}
          </div>
          <div class="table__body-td" :class="{'status-color':task.isDone}">
            {{task.isDone?"Выполнено":"В работе"}}
          </div>
          <div class="table__body-td">{{task.dataTime}}</div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  name:"vTable",
  props:{
    tasks:{
      type: Array,
    },
    sortDateActive: Boolean,
    sortStatusActive: Boolean,
    query : String,
  },
  data(){
    return{
      searchTask:[],
      searchTaskIndex:'',
    }
  },
  computed: {
    computedTask: function () {
      return this.tasks.filter( el =>{
          return el.value.toLowerCase().indexOf(this.query.toLowerCase()) !==-1
        }
      )
    },
  },
  methods:{
    taskDone(taskKey){
      this.intermediateTask = JSON.parse(localStorage.getItem(taskKey))
      this.intermediateTask.isDone = !this.intermediateTask.isDone
      localStorage.setItem(taskKey,JSON.stringify(this.intermediateTask))
      this.$emit('updateTasks')
      if(this.sortDateActive) {
        setTimeout(()=>{
          this.sortDate()
        },0)
      }else{
        setTimeout(()=>{
          this.sortStatus()
        },0)
      }
    },
    sortStatus() {
      this.tasks.sort((a, b) => a.isDone > b.isDone ? 1:-1);
      this.tasks.reverse()
    },
    sortDate() {
      this.tasks.sort((a, b) => a.dataTime > b.dataTime ? 1:-1);
      this.tasks.reverse()
    },
  },  
  setup() {
  },
  watch: {
    sortDateActive(newValue) {
      newValue?this.sortDate():this.sortStatus()
    },
    tasks(newValue,oldValue) {
      if(newValue!==oldValue){
        this.sortDateActive ? this.sortDate() : this.sortStatus() 
      }
    },
  },
  created(){
    this.sortDateActive ? this.sortDate() : this.sortStatus() 
  }
}
</script>

<style lang="scss">
.status-color{
  color:#134EC1 !important;
}
.status-active{
  border: 1px solid #134EC1 !important;
  box-shadow: 0px 4px 4px rgba(19, 78, 193, 0.15) !important;
}
.status-img-active{
  opacity: 1 !important;
}
.flip-list-move {
  transition: transform 1s;
}
.search-animation{
  max-height: 0px;
  padding: 0;
  opacity: 0;
}
.table {

&__header {
  display: flex;
  padding-bottom: 16px;
}

&__header-th:first-child {
  width: 100%;
  margin-left: 83.5px;
}
&__header-th {
  min-width: 150px;
  border-left: 1px solid #C4C4C4;
  padding-left: 20px;
  min-height: 32px;
  display: flex;
  align-items: center;
}

&__body {
  display: flex;
  flex-direction: column-reverse;
  list-style: none;
  overflow: hidden;
}

&__body-tr {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  padding: 19px 0px 19px 40px;
  transition: 0.3s linear;
}

&__body-td {
  min-width: 150px;
  padding-left: 20px;
}
&__body-td:nth-child(3) {
  white-space: nowrap;
}
&__body-td:nth-child(2) {
  width: 100%;
}
&__body-td:nth-child(3) {
  color: #F89B11;
}

&__body-td-check {
  padding: 5px 5.5px 5.5px 6px;
  display: flex;
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid #16191D;
  cursor:pointer;
  margin-right: 20px;
}
&__body-td-check-img{
  opacity: 0  ;
  transition: 0.2s all linear !important;
}
}
@media screen and (max-width:700px) {
  .table{
    &__body-tr{
      padding: 19px 0;
    }
    &__body-td-check{
      margin-right: 0;
    }  
    &__header-th{
      min-width: 80px;
      padding-left: 10px;
    }
    &__header-th:first-child {
        width: 100%;
        margin-left: 23.5px;
    }
    &__body-td{
      min-width: 80px;
      padding-left: 10px ;
      font-size: 14px;
    }
  }
}
</style>