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
                        <v-card height="100" width="200">
                            <div class="img-container">
                                <img :src="offer.img" height="100" width="200" contain="false">
                                <div class="top-left title font-weight-bold">{{offer.title}}</div>
                            </div>
                        </v-card>
                    </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex xs12 v-for="category in categories" :key="category['.key']">
            <v-card @click.native="onCatClick(category.name)">
                <v-card class="img-container"><!-- :img="category.img">-->
                    <v-img :src="category.img" height="100px"/>
                    <div class="top-left subheading font-weight-bold">{{category.name}}</div>
                </v-card>
            </v-card>
        </v-flex>



    </v-layout>
</template>

<script>
import { firestore, firebase } from '../../services'

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
                    img: '#',
                    imgRef: 'rossmann.png'
                },
                {
                    id: 1,
                    title: '1 photo for free',
                    content: 'Or rather DM?',
                    img: '#',
                    imgRef: 'dm.png'
                },
                {
                    id: 2,
                    title: '5% off',
                    content: 'Receive 5% off your next order',
                    img: '#',
                    imgRef: 'docmorris.png'
                }

            ]
        }
    },
    firestore () {
        return {
            categories: firestore.collection('categories')
        }
    },
    created: function () {
        this.changeImg()
    },
    methods: {
        onCatClick: function (sCatName) {
            this.$router.push({
                name: 'institutions',
                params: {
                    catName: sCatName
                }
            })
        },
        changeImg: function () {
            // Point to categories in storage
            var imagesRef = firebase.storage().ref().child('categories/advertisements')

            // iteratie over every element for horizontal slider
            this.offers.forEach(function (i) {
                var spaceRef = imagesRef.child(i.imgRef)
                spaceRef.getDownloadURL().then(function (url) {
                    i.img = url
                })
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
.card-text {
    height:100px;
    width:300px;
}
</style>