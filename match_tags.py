import re

def check_tags(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    tags = []

    # Very basic regex to find tags
    for m in re.finditer(r'<(/?)(\w+(\.\w+)?)[^>]*>', content):
        is_closing = m.group(1) == '/'
        tag_name = m.group(2)

        # ignore self closing tags
        if content[m.end()-2:m.end()] == '/>':
            continue

        # Ignore common non-React tags if they don't have children usually or break parser logic simply
        if tag_name in ['img', 'input', 'br', 'hr']:
            continue

        line_num = content[:m.start()].count('\n') + 1

        if not is_closing:
            tags.append((tag_name, line_num, m.group(0)))
        else:
            if not tags:
                print(f"Error: Closing tag </{tag_name}> at line {line_num} has no matching open tag.")
                return

            last_tag, last_line, last_str = tags.pop()
            if last_tag != tag_name:
                print(f"Error: Tag mismatch at line {line_num}. Expected </{last_tag}> (from line {last_line}), found </{tag_name}>.")
                print(f"  Open: {last_str} at line {last_line}")
                print(f"  Close: {m.group(0)} at line {line_num}")
                return

    if tags:
        print("Unclosed tags remaining:")
        for t in tags:
            print(f"  <{t[0]}> opened at line {t[1]}")
    else:
        print("All tags matched (basic check)!")

check_tags("src/pages/Home.tsx")
