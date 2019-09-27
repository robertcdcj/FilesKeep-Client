import React from "react";
import chromeIcon from "../../../icon/chrome.png";

export function capStringLength(string) {
    const charLimit = 15;
    let returnString = string;

    if (string.length > charLimit) {
        returnString = string.slice(0, charLimit) + "...";
    }

    return returnString;
}

export function getIconByMimeType(mimeType, name, fontSize) {
    let [type, subtype] = mimeType.split("/");
    let style = {
        fontSize: fontSize,
        "max-width": "50%",
        "max-height": "50%"
    }
    switch (type) {
        case "image":
            style.color = "green";
            return <i class="far fa-file-image" style={style}></i>;
        case "video":
            style.color = "#F24040";
            return <i class="far fa-file-video" style={style}></i>;
        case "audio":
            style.color = "#DFA516";
            return <i class="far fa-file-audio" style={style}></i>;
        case "font":
            return <i class="far fa-font" style={style}></i>;
        case "application":
            switch (subtype) {
                case "pdf":
                    style.color = "red";
                    return <i class="far fa-file-pdf" style={style}></i>;
                case "plain":
                    return "";
                case "vnd.openxmlformats-officedocument.wordprocessingml.document":
                    style.color = "#103F91";
                    return <i class="far fa-file-word" style={style}></i>;
                case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    style.color = "#185C37";
                    return <i class="far fa-file-excel" style={style}></i>;
                case "vnd.openxmlformats-officedocument.presentationml.presentation":
                    style.color = "#B8391A";
                    return <i class="far fa-file-powerpoint" style={style}></i>;
                case "octet-stream":
                    if (name.endsWith(".rar")) {
                        style.color = "#F5AF32";
                        return <i class="far fa-file-archive" style={style}></i>;
                    } else if (name.endsWith(".lnk")) {
                        return <i class="fas fa-link" style={style}></i>;
                    } else if (name.endsWith(".url")) {
                        // return <img src={chromeIcon} style={style} />
                    }
                    break;
                case "x-zip-compressed":
                    style.color = "#F5AF32";
                    return <i class="far fa-file-archive" style={style}></i>;
                case "vnd.ms-publisher":
                    style.color = "#036C70";
                    return <i class="far fa-file-powerpoint" style={style}></i>;
                case "json":
                    return <i class="far fa-file-alt" style={style}></i>;
                case "html":
            }
        case "text":
            switch (subtype) {
                case "html":
                    style.color = "#EA5730";
                    return <i class="fab fa-html5" style={style}></i>;
                case "css":
                    style.color = "#007AC3";
                    return <i class="fab fa-css3-alt" style={style}></i>;
                case "javascript":
                    style.color = "#EE7E32";
                    return <i class="fab fa-js-square" style={style}></i>;
                case "plain":
                    style.color = "#7890F8";
                    return <i class="fas fa-file-alt" style={style}></i>;
            }
        case "example":
        case "model":
        default:
            // console.log(name, type, subtype);
            return <i class="far fa-file" style={style}></i>;
    }
}

export function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

export function getFileSizeString(fileSize) {
    const suffix = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    let suffixIndex = fileSize > 0 ? Math.floor(getBaseLog(1000, fileSize)) : 0;
    suffixIndex = Math.min(suffixIndex, suffix.length - 1);

    const fileSizeInSuffixUnit = fileSize / Math.pow(1000, suffixIndex);

    return (suffixIndex > 0 ? fileSizeInSuffixUnit.toFixed(2) : fileSizeInSuffixUnit) + suffix[suffixIndex];
}