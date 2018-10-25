<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-text class="overflow-hidden py-0">
                    <v-layout row align-content-center class="horiz-scroll">
                    <v-flex
                    v-for="offer in offers"
                    :key="offer.id"
                    px-1
                    pb-2>
                        <div class="img-container">
                            <img :src="offer.img" height="100" width="200">
                            <div class="top-left subheading font-weight-bold">{{offer.title}}</div>
                        </div>
                    </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex xs12 v-for="category in categories" :key="category['.key']">
            <v-card @click.native="onCatClick(category.name)">
                <v-card-text>
                    <div class="img-container">
                            <img :src="category.img" height="100" width="200">
                            <div class="top-left subheading font-weight-bold">{{category.name}}</div>
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>



    </v-layout>
</template>

<script>
import { firestore } from '../../services'
export default {
    name: 'Discover',
    data () {
        return {
            loading: false,
            categories: [],
            error: null,
            offers: [
                {
                    id: 0,
                    title: '20% off',
                    content: 'Receive a free voucher for your next Rossmann visit',
                    img: '#'
                },
                {
                    id: 2,
                    title: 'DM Coupon',
                    content: 'Or rather DM?',
                    img: '#'
                }
            ]
        }
    },
    firestore () {
        return {
            categories: firestore.collection('categories')
        }
    },
    methods: {
        onCatClick: function (sCatName) {
            this.$router.push({
                name: 'institutions',
                params: {
                    catName: sCatName
                }
            })
        }
    }
}
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}

.horiz-scroll {
  overflow-y: hidden;
  overflow-x: auto;
}

.img-container {
    position: relative;
    text-align: center;
}

.top-left {
    position: absolute;
    top: 26px;
    left: 26px;
}
</style>