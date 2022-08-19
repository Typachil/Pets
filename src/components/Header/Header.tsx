import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <div>
        <ul>
            <li>
                <Link to="/blog">Blog</Link>
            </li>
            <li><Link to="/start">Start</Link></li>
        </ul>
    </div>
  )
}
