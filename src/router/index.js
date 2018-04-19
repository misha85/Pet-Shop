import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

/*============  Articles  ===========*/
import SelectSingle from '@/components/articles/SelectSingle'
import SelectGroup from '@/components/articles/SelectGroup'
import Articles from '@/components/articles/Articles'
import SelectAll from '@/components/articles/SelectAll'

/*============  Info  ===========*/
import Onama from '@/components/info/Onama'
import Ozivotinjama from '@/components/info/Ozivotinjama'
import Ohrani from '@/components/info/Ohrani'

/*==========  BLOG  ============*/
import Blog from '@/components/blog/Blog'
import SingleBlog from '@/components/blog/SingleBlog'
import CategoryBlogs from '@/components/blog/CategoryBlogs'
import InitBlogs from '@/components/blog/InitBlogs'
import SearchedBlogs from '@/components/blog/SearchedBlogs'

import Register from '@/components/login/Register'
import UserNalog from '@/components/nalog/UserNalog'
import Kontakt from '@/components/kontakt/Kontakt'

/*======================  ADMIN  ========================*/
import AdminHome from '@/components/admin/AdminHome'
import AdminKorisnici from '@/components/admin/AdminKorisnici'

/*==========  ADMIN  BLOG  ============*/
import AdminBlogs from '@/components/admin/blog/Blogs'
import Table from '@/components/admin/blog/Table'
import AddBlog from '@/components/admin/blog/AddBlog'
import AdminBlog from '@/components/admin/blog/Blog'
import ConfirmComment from '@/components/admin/blog/ConfirmComment'
import EditBlog from '@/components/admin/blog/EditBlog'

/*==========  ADMIN  ARTIKLI  ============*/
import Products from '@/components/admin/products/Products'
import AddProduct from '@/components/admin/products/AddProduct'
import EditProduct from '@/components/admin/products/EditProduct'

/*==========  ADMIN  BANERI  ============*/
import Banners from '@/components/admin/banners/EditBanners'


Vue.use(Router)

export default new Router({
  routes: [
    /*============  Articles  ===========*/
      { path: '/', name: 'Pocetna', component: Home },
      { path: '/artikli', component: Articles, children: [
            { path: '', name: 'SelectAll', component: SelectAll },
            { path: ':nameGroup-:idGroup', name: 'SelectGroup', component: SelectGroup },
            { path: ':id/:name', name: 'SelectSingle', component: SelectSingle },
        ] },

    /*============  Info  ===========*/
    { path: '/info/o-nama', name: 'o-nama', component: Onama },
    { path: '/info/o-zivotinjama', name: 'o-zivotinjama', component: Ozivotinjama },
    { path: '/info/o-hrani', name: 'o-hrani', component: Ohrani },

    /*============  BLOG  ===========*/
    { path: '/blog', component: Blog, children: [
        { path: '', component: InitBlogs  },
        { path: ':search', component: SearchedBlogs  },
        { path: ':title/:id', name: 'singleBlog', component: SingleBlog  }
    ] },

    { path: '/usernalog/:id', name: 'user-nalog', component: UserNalog },
    { path: '/admin/korisnici', name: 'admin-korisnici', component: AdminKorisnici },
    { path: '/kontakt', name: 'kontakt', component: Kontakt },
    { path: '/register', name: 'register', component: Register },

    /*======================  ADMIN  ========================*/
    { path: '/admin/pocetna', component: AdminHome },

    /*============  ADMIN  BLOG  ===========*/
    { path: '/admin/blog', component: AdminBlog, children: [
        { path: '', component: AdminBlogs },
        { path: 'tabela', component: Table },
        { path: 'dodaj-blog', component: AddBlog },
        { path: 'edit-blog/:id', component: EditBlog },
        { path: 'uredi-blog/:id', component: ConfirmComment }
    ] },

    /*============  ADMIN  ARTIKLI  ===========*/
    { path: '/admin/artikli', component: Products, children: [
        { path: 'dodaj-artikal', name: 'dodaj-artikal', component: AddProduct },
        { path: 'izmeni-artikal/:id', name: 'izmeni-artikal', component: EditProduct }
    ] },

    /*============  ADMIN  BANERI  ===========*/
    { path: '/admin/izmeni-baner/:location', component: Banners, name: 'editBanner' }
],
mode: 'history'
})
