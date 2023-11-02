import React, {SVGProps} from 'react'

export default function UserIcon({ ...rest }: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...rest}>
            <path d="M8.534 12.07C8.65695 12.0175 8.78916 11.9903 8.92283 11.9898C9.0565 11.9893 9.18891 12.0156 9.31223 12.0672C9.43555 12.1188 9.54728 12.1945 9.64082 12.29C9.73436 12.3855 9.8078 12.4988 9.85681 12.6231C9.90582 12.7475 9.9294 12.8804 9.92615 13.014C9.92291 13.1477 9.8929 13.2793 9.83792 13.4011C9.78293 13.523 9.70408 13.6325 9.60602 13.7234C9.50796 13.8142 9.39268 13.8845 9.267 13.93C8.59854 14.1934 8.02483 14.6519 7.6205 15.2458C7.21618 15.8397 6.99997 16.5415 7 17.26V19C7 19.2652 7.10536 19.5196 7.29289 19.7071C7.48043 19.8946 7.73478 20 8 20H16C16.2652 20 16.5196 19.8946 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V17.353C17.0001 16.6115 16.7749 15.8874 16.3541 15.2768C15.9334 14.6662 15.337 14.1979 14.644 13.934C14.5175 13.8901 14.4012 13.8213 14.3018 13.7316C14.2024 13.6419 14.1221 13.5332 14.0655 13.4119C14.009 13.2905 13.9773 13.1591 13.9725 13.0253C13.9677 12.8916 13.9897 12.7582 14.0374 12.6331C14.0851 12.508 14.1574 12.3938 14.25 12.2972C14.3427 12.2006 14.4538 12.1235 14.5767 12.0706C14.6997 12.0177 14.832 11.9901 14.9659 11.9893C15.0998 11.9885 15.2324 12.0146 15.356 12.066C16.4276 12.4742 17.3499 13.1983 18.0006 14.1425C18.6514 15.0867 18.9999 16.2063 19 17.353V19C19 19.7956 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7956 22 16 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7956 5 19V17.26C5.00014 16.1402 5.33728 15.0463 5.96756 14.1206C6.59785 13.195 7.4921 12.4805 8.534 12.07ZM12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6V8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8V6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2V2ZM12 4C11.4696 4 10.9609 4.21071 10.5858 4.58579C10.2107 4.96086 10 5.46957 10 6V8C10 8.53043 10.2107 9.03914 10.5858 9.41421C10.9609 9.78929 11.4696 10 12 10C12.5304 10 13.0391 9.78929 13.4142 9.41421C13.7893 9.03914 14 8.53043 14 8V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4Z" fill="currentColor" />
        </svg>

    )
}
