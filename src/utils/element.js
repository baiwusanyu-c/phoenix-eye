/*
 * @Author: yinian430 
 * @Date: 2020-07-06 18:36:36 
 * @Last Modified by: yinian430
 * @Last Modified time: 2021-05-19 14:01:30
 */
import Vue from 'vue';

import {
    Input,
    Select,
    Option,
    Button,
    Badge,
    Dialog,
    Form,
    FormItem,
    MessageBox,
    Popover,
    Autocomplete,
    Table,
    TableColumn,
    Pagination,
    Switch,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Tabs,
    TabPane,
    Icon,
    Notification,
    DatePicker,
    Loading,
    Tooltip,
    Scrollbar,
    Carousel,
    CarouselItem,
    Checkbox,
    CheckboxGroup,
    Radio,
    Drawer,
    Collapse,
    CollapseItem,
    Slider,
    InputNumber,
    RadioGroup,
    Menu,
    Submenu,
    MenuItem,
    ButtonGroup,
    MenuItemGroup,
    Tag,
    Divider,
} from 'element-ui';
import { message  } from './resetMessage';

var list = [Input, DatePicker, Select, Option, Button, Dialog, Form, FormItem, Popover, Autocomplete, Loading, Scrollbar, Tooltip, Table, TableColumn, Pagination, Switch,
    Dropdown, DropdownMenu, DropdownItem, Icon, Tabs, TabPane, Carousel, CarouselItem, Checkbox, CheckboxGroup, Radio, Drawer, Collapse, CollapseItem, Slider,InputNumber,
    RadioGroup,Badge, Menu, Submenu,MenuItem,MenuItemGroup,ButtonGroup,Tag,Divider
]

function init(list) {
    list.map(index => {
        Vue.use(index)
    })
}
init(list);

Vue.prototype.$message = message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification