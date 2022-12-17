const data = [
    {
        id:1,
        name: 'داشبورد',
        icon: 'iconsminds-dashboard',
        label: 'menu.dashboards',
        to: `dashboard`,
    },
    {
        id:2,

        name: 'کاربران',
        icon: 'iconsminds-administrator',
        label: 'menu.customer',
        subs: [
            {
                id:2,
                icon: 'iconsminds-box-with-folders',
                name: 'لیست کاربران',
                label: 'menu.userlist',
                to: `userlist`,


            },
            {
                id:2,
                name: 'لیست سازمان ها',
                label: 'menu.organizationlist',
                to: `organizationlist`,
                icon: 'iconsminds-box-with-folders',
            },
            {
                id:2,
                name: 'گروه ها',
                label: 'menu.customergroup',
                to: `customergroup`,
                icon: 'iconsminds-conference',
            }


        ],
    },
    {
        id:3,

        name: 'کالا',
        icon: 'iconsminds-box-close',
        label: 'menu.product',
        subs: [
            {
                id:3,
                icon: 'iconsminds-box-with-folders',
                name: 'لیست کالا',
                label: 'menu.productList',
                to: `productList`,


            },
            {
                id:3,
                name: 'گروه کالا',
                label: 'menu.productgroup',
                to: `productgroup`,
                icon: 'iconsminds-box-with-folders',
            }


        ],
    },
    {
        id:4,

        name: 'انبار',
        icon: 'iconsminds-shop-2',
        label: 'menu.warehouselist',
        subs: [
            {
                id:4,
                icon: 'iconsminds-box-with-folders',
                name: 'لیست انبار',
                label: 'menu.warehouselist',
                to: `warehouselist`,


            },
            {
                id:4,
                name: 'گروه انبار',
                label: 'menu.productgroup',
                to: `warehousetypes`,
                icon: 'iconsminds-box-with-folders',
            }


        ],
    },
    {
        id:5,

        name: 'تامین',
        icon: 'iconsminds-ship',
        label: 'menu.product',
        subs: [
            {
                id:5,
                icon: 'iconsminds-factory',
                name: 'لیست تامین کنندگان',
                label: 'menu.productList',
                to: `supplierList`,


            },
            {
                id:5,
                name: 'لیست تامین',
                label: 'menu.productgroup',
                to: `supply`,
                icon: 'iconsminds-mine',
            }


        ],
    },
    {
        id:6,

        name: 'فروش',
        icon: 'iconsminds-coins',
        label: 'menu.product',
        subs: [
            {
                id:6,
                icon: 'iconsminds-receipt-4',
                name: 'عرضه',
                label: 'menu.productList',
                to: `productSupply`,


            },
            {
                id:6,
                name: 'سفارشات',
                label: 'menu.productgroup',
                to: `orderList`,
                icon: 'iconsminds-handshake',
            },
            {
                id:6,
                name: 'بازارگاه',
                label: 'menu.productgroup',
                to: `bazargah`,
                icon: "iconsminds-calendar-4",
            }


        ],
    },
    {
        id:7,

        name: 'تحویل کالا',
        icon: 'iconsminds-jeep',
        label: 'menu.shippingcompany',
        subs: [
            {
                id:7,
                icon: 'iconsminds-box-with-folders',
                name: 'لیست باربری',
                label: 'menu.shippingcompany',
                to: `shippingcompanyList`,


            },
            {
                id:7,
                name: 'لیست قرارداد باربری',
                label: 'menu.shippingcompany',
                to: `ShippingContract`,
                icon: 'iconsminds-box-full',
            },
            {
                id:7,
                name: 'بروزرسانی باربری',
                label: 'menu.shippingcompany',
                to: ``,

                icon: 'iconsminds-arrow-circle',
                subs: [
                    {
                        id:7,
                        name: 'براساس تاریخ',
                        label: 'menu.shippingcompany',
                        to: `updateShippingReports`,
                        icon: 'iconsminds-24-hour',
                    },  {
                        id:7,
                        name: 'براساس حواله',
                        label: 'menu.shippingcompany',
                        to: `updateAllShipping`,
                        icon: 'iconsminds-repeat',
                    },
                ]
            }


        ],
    },
    {
        id:8,

        name: 'حسابداری',
        icon: 'iconsminds-cash-register-2',
        label: 'menu.product',
        to: '',

    }, {
        id:9,

        name: 'پشتیبانی',
        icon: 'iconsminds-support',
        label: 'menu.product',
        subs: [
            {
                id:9,
                icon: 'iconsminds-mail-read',
                name: 'اطلاعات و اعلان ها ',
                label: 'menu.productList',
                to: `user-news`,


            },
            {
                id:9,
                name: 'لیست تیکت ها',
                label: 'menu.productgroup',
                to: `ticket`,
                icon: 'iconsminds-inbox-into',
            }


        ],
    }, {
        id:10,

        name: 'تنظیمات',
        icon: 'iconsminds-gear',
        label: 'menu.product',
        subs: [
            {
                id:10,
                icon: 'iconsminds-library',
                name: 'تعاریف',
                label: 'menu.productList',
                to: `productList`,
                subs: [
                    {
                        id:10,
                        icon: 'iconsminds-box-full',
                        name: 'دسته بندی',
                        label: 'menu.productList',
                        to: `createAttribute`,


                    }, {
                        id:10,
                        icon: 'iconsminds-box-with-folders',
                        name: 'گروه بندی',
                        label: 'menu.productList',
                        to: `creategroup`,


                    },]

            },



        ],
    },, {
        id:11,

        name: 'حساب کاربری',
        icon: 'iconsminds-id-card',
        label: 'menu.product',
        subs: [
            {
                id:11,
                icon: 'iconsminds-administrator',
                name: 'اطلاعات کاربری',
                label: 'menu.productList',
                to: `userProfile`,


            }, {
                id:11,
                icon: 'iconsminds-power',
                name: 'خروج از سامانه',
                label: 'menu.productList',
                to: `logout`,


            },



        ],
    },

];
export default data;
