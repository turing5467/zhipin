import styled from 'styled-components'

export default styled.div`
    background-color: #202329;
    height: 49px;
    .logo {
        float: left;
        padding: 6px 0 0 0;
        a {
            display: block;
            width: 110px;
            height: 36px;
            background: url(${props => props.logo}) 3px 7px no-repeat;
            background-size: 105px 19px;
        }
        span {
            display: none;
        }
    }
    .nav {
        font-size: 0;
        float: left;
        margin-left: 15px;
        height: 49px;
        line-height: 49px;
        li {
            display: inline-block;
            vertical-align: top;
            text-align: center;
            font-size: 14px;
            margin: 0 7px;
            a {
                color: #fff;
                &:hover {
                    color: #00d7c6!important;
                }
                &.cur {
                    color: #00d7c6!important;
                }
            }
        }
    }
`