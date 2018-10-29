<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card class="ads-container">
                <v-card-text class="overflow-hidden py-0">
                    <v-layout row align-content-center class="horiz-scroll">

                    <v-flex xs12 v-for="offer in offers"
                    :key="offer.id"
                    px-1
                    pb-2>
                        <v-card color="grey lighten-2" width="200" height="120" class="darkgrey--text ad-container">
                            <v-img :src="offer.img" width="200" height="100" contain="false">
                                <v-card-title primary-title>
                                    <div class="headline font-weight-black">{{offer.title}}</div>
                                    <div>{{offer.content}}</div>
                                </v-card-title>
                            </v-img>
                        </v-card>
                    </v-flex>

                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex xs12 v-for="category in categories" :key="category['.key']">
            <v-card @click.native="onCatClick(category.name)">
                <v-img :src="category.img" height="100px"/>
                <div class="top-left title font-weight-black white--text">{{category.name}}</div>
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
                    title: '1 photo free',
                    content: 'Get one printed photo for free on your next visit',
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

            // iterate over every element for picture in horizontal slider
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
.ads-container {
    background-color:#FAFAFA;
    box-shadow: none;
    height:120px;
}
.ad-container {
    border-radius:5px;
}
</style>